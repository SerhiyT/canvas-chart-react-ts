import './styles/styles.scss';
import {
  computeBoundaries, isOver, drawChartLine, drawPoint, toShortDate, css,
} from './utils/utils';
import {
  WIDTH, HEIGHT, DPI_WIDTH, DPI_HEIGHT, PADDING, VIEW_HEIGHT, VIEW_WIDTH, ROWS_COUNT,
} from './utils/const';
import { tooltip } from './Tooltip';

const chart = (root, arrData) => {
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const tip = tooltip(root.querySelector('[data-el="tooltip"]'));

  let raf;
  css(canvas, {
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
  });

  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  const clearContext = () => {
    ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
  };

  const draw = () => {
    clearContext();
    const [yMin, yMax] = computeBoundaries(arrData);
    const yRatio = VIEW_HEIGHT / (yMax - yMin);
    const xRatio = VIEW_WIDTH / (arrData.columns[0].length - 2);
    const yData = arrData.columns.filter(column => arrData.types[column[0]] === 'line');
    const xData = arrData.columns.filter(column => arrData.types[column[0]] !== 'line')[0];

    yAxis(yMax, yMin);
    xAxis(xData, yData, xRatio);

    // ==== draw graph line ====
    yData.map(toCoords(xRatio, yRatio)).forEach((coords, i) => {
      const color = arrData.colors[yData[i][0]];
      drawChartLine(ctx, coords, { color });

      // ==== draw point ====
      for (const [x, y] of coords) {
        if (isOver(proxy?.mouse, x, coords.length, DPI_WIDTH)) {
          drawPoint(ctx, [x, y], color);
          break;
        }
      }
    });
  };

  //* closure / =============================================
  const toCoords = (xRatio, yRatio) => column => column
    .map((y, i) => [
      Math.floor((i - 1) * xRatio),
      Math.floor(DPI_HEIGHT - PADDING - y * yRatio),
    ])
    .filter((_, i) => i !== 0);

  // ====== Proxy / =========================================
  const proxy = new Proxy(
    {},
    {
      set(...args) {
        const result = Reflect.set(...args);
        raf = requestAnimationFrame(draw);
        return result;
      },
    },
  );

  // ====== track mousemove =================================
  const mousemove = ({ clientX, clientY }) => { // event: {..., clientX, clientY, ...}
    const { left, top } = canvas.getBoundingClientRect();
    proxy.mouse = {
      x: (clientX - left) * 2,
      tooltip: {
        left: clientX - left,
        top: clientY - top,
      },
    };
  };
  const mouseleave = () => {
    proxy.mouse = null;
    tip.hide();
  };

  canvas.addEventListener('mousemove', mousemove);
  canvas.addEventListener('mouseleave', mouseleave);

  // ==== draw xAxis text ===================================
  const xAxis = (xData, yData, xRatio) => {
    const columnsCount = 11;
    const scaleStep = Math.round(xData.length / columnsCount);

    ctx.beginPath();
    for (let i = 1; i <= xData.length; i++) {
      const x = i * xRatio;
      if ((i - 1) % scaleStep === 0) {
        const textScaleX = toShortDate(xData[i]);
        ctx.fillText(textScaleX, x, DPI_HEIGHT);
      }

      // == draw vertical line on chart by mouseOver ==
      if (isOver(proxy?.mouse, x, xData.length, DPI_WIDTH)) {
        ctx.save();
        ctx.moveTo(x, PADDING);
        ctx.lineTo(x, DPI_HEIGHT - PADDING);
        ctx.restore();

        // ===== tooltip =====
        tip.show(proxy.mouse.tooltip, {
          title: toShortDate(xData[i]),
          items: yData.map(column => ({
            color: arrData.colors[column[0]],
            name: arrData.names[column[0]],
            value: column[i + 1],
          })),
        });
      }
    }
    ctx.stroke();
    ctx.closePath();
  };

  // ==== draw yAxis line && text ======================
  const yAxis = (yMax, yMin) => {
    const scaleStep = VIEW_HEIGHT / ROWS_COUNT;
    const textStep = (yMax - yMin) / ROWS_COUNT;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ccc';
    ctx.font = 'normal 22px Helvetica, sans-serif';
    ctx.fillStyle = '#9cb09e';

    for (let i = 1; i <= ROWS_COUNT; i++) {
      const y = scaleStep * i;
      const textScaleY = Math.round(yMax - textStep * i);

      ctx.fillText(textScaleY, 0, y + PADDING - 5);
      ctx.moveTo(0, y + PADDING);
      ctx.lineTo(DPI_WIDTH, y + PADDING);
    }
    ctx.stroke();
    ctx.closePath();
  };

  return {
    init() {
      draw();
    },
    destroy() {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', mousemove);
      canvas.removeEventListener('mouseleave', mouseleave);
    },
  };
};

export default chart;
