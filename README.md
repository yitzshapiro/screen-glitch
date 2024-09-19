# ScreenGlitch

A React component that simulates a realistic CRT monitor glitch effect.

![ScreenGlitch Demo](https://your-image-url.com/demo.gif)

## Installation

Install the package via npm:

```bash
npm install screen-glitch
```

Or via yarn:

```bash
yarn add screen-glitch
```

## Usage

```
import React, { useState } from 'react';
import { ScreenGlitch } from 'screen-glitch';
import 'screen-glitch/dist/ScreenGlitch.css';

const App = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  return (
    <div>
      <button onClick={() => setGlitchActive(!glitchActive)}>
        Toggle Glitch
      </button>
      <ScreenGlitch active={glitchActive} />
      {/* Rest of your app components */}
    </div>
  );
};

export default App;
```

## Props
| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| active | boolean | Yes | When true, activates the glitch effect |

## Styling
Make sure to import the CSS file in your project:
```
import 'screen-glitch/dist/ScreenGlitch.css';
```

## License
This project is licensed under the MIT License.