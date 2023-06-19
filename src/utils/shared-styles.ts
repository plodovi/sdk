import { css } from 'lit';

export const sharedStyles = css`
  :host {
    --color-primary: rgb(198, 163, 98);
    --text-light: #e5e7eb;
    --text-dark: black;
    --br-small: 8px;
    --br-medium: 16px;
    --br-big: 30px;
    --br-top-left: 30px;
    --br-top-right: 30px;
    --br-bottom-right: 30px;
    --br-bottom-left: 30px;
    --padding-y: 10px 0;
    --padding-y-md: 20px 0;
    --padding-y-lg: 40px 0;
    --padding-x: 0px 10px;
    --padding-x-md: 0px 20px;
    --padding-x-lg: 0px 40px;
    --padding-all: 10px;
    --padding-all-md: 20px;
    --padding-all-lg: 40px;
    --margin-y: 10px 0;
    --margin-y-md: 20px 0;
    --margin-y-lg: 40px 0;
    --margin-y-20: 20px 0;
    --margin-all: 10px;
    --margin-x: 0px 10px;
    --btn-padding: 10px 1.25rem;
    --btn-padding-xs: 5px 0.75rem;
    --font-size: 16px;
    --font-size-md: 20px;
    --font-size-lg: 20px;
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
