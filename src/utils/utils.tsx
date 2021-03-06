interface ComputeBoundariesTypes {
  columns: (string | number)[][]
  types: {
    y0: string
    y1: string
    y2: string
    x: string
  }
}

// compute boundaries =====================================
export const computeBoundaries = ({ columns, types }: ComputeBoundariesTypes) => {
  let min: null | number | string = null;
  let max: null | number | string = null;

  columns.forEach(column => {
    if (types[column[0]] !== 'line') {
      return;
    }

    if (typeof min !== 'number') min = column[1];
    if (typeof max !== 'number') max = column[1];

    if (min && min > column[1]) min = column[1];
    if (max && max < column[1]) max = column[1];

    for (let i = 2; i < column.length; i++) {
      if (min && min > column[i]) min = column[i];
      if (max && max < column[i]) max = column[i];
    }
  });
  return [min, max];
};

// ==== check mouse coordinate ============================
export const isOver = (mouse: any, x: number, length: number, dpiWidth: number) => {
  if (!mouse) {
    return false;
  }

  const width = dpiWidth / length;
  return Math.abs(x - mouse.x) < width / 2;
};

// ==== draw chart line ===================================
type colorType = { color: string }
export const drawChartLine = (
  ctx: CanvasRenderingContext2D,
  coords: [], { color }: colorType,
) => {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;

  coords.forEach(element => {
    const x = element[0];
    const y = element[1];

    ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.closePath();
};

// ==== draw point ========================================
export const drawPoint = (
  ctx: CanvasRenderingContext2D,
  [x, y]: number[],
  color: colorType & CanvasPattern,
) => {
  const POINT_RADIUS = 7;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = 'white';
  ctx.arc(x, y, POINT_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

// ==== to short date ====================================
export const toShortDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const shortMounth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${date.getDate()} ${shortMounth[date.getMonth()]} ${date.getFullYear()}`;
};

// ========================================================
export const css = (el: HTMLElement, styles = {}) => {
  Object.assign(el.style, styles);
};
