# ScreenGlitch

A React component that applies a realistic CRT monitor glitch effect to your entire application.

![ScreenGlitch Demo](docs/demo.gif)

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

Import and use the `ScreenGlitch` component in your React application. The `active` prop controls whether the glitch effect is active.

### Basic Example

```typescript:src/App.tsx
import React, { useState } from 'react';
import ScreenGlitch from './components/ScreenGlitch';

const App: React.FC = () => {
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

### Automatically Trigger Glitch on DOM Load

The following example activates the glitch effect automatically when the DOM is loaded and deactivates it after a specified duration (e.g., 5 seconds).

```typescript:src/App.tsx
import React, { useEffect, useState } from 'react';
import ScreenGlitch from './components/ScreenGlitch';

const App: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Activate glitch on DOM load
    setGlitchActive(true);

    // Deactivate glitch after 5 seconds
    const timer = setTimeout(() => {
      setGlitchActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <ScreenGlitch active={glitchActive} />
      {/* Rest of your app components */}
    </div>
  );
};

export default App;
```

### Glitch During Specific Events

You can also trigger the glitch effect in response to specific events, such as clicking a button, navigating to a route, or any other custom event.

```typescript:src/App.tsx
import React, { useState } from 'react';
import ScreenGlitch from './components/ScreenGlitch';

const App: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  const triggerGlitch = () => {
    setGlitchActive(true);
    // Deactivate glitch after 3 seconds
    setTimeout(() => setGlitchActive(false), 3000);
  };

  return (
    <div>
      <button onClick={triggerGlitch}>
        Trigger Glitch
      </button>
      <ScreenGlitch active={glitchActive} />
      {/* Rest of your app components */}
    </div>
  );
};

export default App;
```

## Props

| Prop   | Type     | Required | Description                                  |
| ------ | -------- | -------- | -------------------------------------------- |
| active | boolean  | Yes      | When `true`, activates the glitch effect     |

## Styling

Ensure you import the CSS file in your project to apply necessary styles for the glitch effect.

```typescript
import 'screen-glitch/dist/ScreenGlitch.css';
```

## Features

- **Realistic Glitch Effect:** Simulates CRT monitor glitches with skewing, shifting, and blurring.
- **Customizable Segments:** Adjust the number and size of glitch segments for desired intensity.
- **Whole-Screen Effects:** Applies transformations to the entire screen for a comprehensive glitch experience.
- **Clean Cleanup:** Removes all effects seamlessly when the glitch is deactivated.

## Customization

You can customize various aspects of the glitch effect by modifying the `ScreenGlitch.tsx` file:

- **Number of Glitch Segments:** Adjust the `numSegments` variable to increase or decrease the number of glitch overlays.
- **Skew Intensity:** Modify the skew values in the `applyWholeScreenSkew` and `applyDOMGlitches` functions for more or less dramatic effects.
- **GIF Overlays:** Replace or add more glitch GIFs in the `glitchGifs` array to diversify the glitch visuals.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


## Credits

Developed by [Yitz Shapiro](https://github.com/yitzshapiro).

## License

MIT © [Yitz Shapiro](https://github.com/yitzshapiro)