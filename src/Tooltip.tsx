import { css } from './utils/utils';

interface DataTypes {
  items: {
    color: string
    name: string
    value: number
  }[]
  title: string
}
type tooltipCoords = {
  left: number
  top: number
}
const template = (data: DataTypes) => `
  <div class="tooltip-title">${data.title}</div>
  <ul class="tooltip-list">
    ${data.items
    .map(item => `<li class="tooltip-list-item">
        <div class="value" style="color: ${item.color}">${item.value}</div>
        <div class="name" style="color: ${item.color}">${item.name}</div>
      </li>`)
    .join('\n')}
  </ul>
`;

export const tooltip = (el: HTMLElement) => {
  const clear = () => { el.innerHTML = ''; };

  return {
    show({ left, top }: tooltipCoords, data: DataTypes) {
      const { height, width } = el.getBoundingClientRect();
      clear();
      css(
        el,
        {
          display: 'block',
          top: `${top - height}px`,
          left: `${left + width / 2}px`,

        },
      );
      el.insertAdjacentHTML(
        'afterbegin',
        template(data),
      );
    },
    hide() {
      css(
        el,
        { display: 'none' },
      );
    },
  };
};

export default tooltip;
