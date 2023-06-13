import { css } from 'lit';

export const sharedStyles = css`
  :host {
      --color-primary: rgb(198, 163, 98);
      --text-light: #e5e7eb;
      --text-dark: black;
      --br-small: 8px;
      --br-medium: 16px;
      --br-big: 30px;
      --margin-y: 10px 0;
      --margin-y-20: 20px 0;
      --padding-y: 10px 0;
      --margin-x: 0px 10px;
      --padding-x: 0px 10px;
      --padding-all: 10px;
      --padding-all-20: 20px;
      --margin-all: 10px;
      --btn-padding: 10px 1.25rem;
      --font-size: 16px;
      --font-size-md: 20px;
      --quantity-btn-w: 30px;
  }
    body {
      background: rgb(18, 18, 18);
      color:var(--text-light)
    }
    #demo {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
`
