import { ReactFlowProvider } from '@xyflow/react';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';
import useStore from './store';
import { getTheme } from './themes';

function App() {
  const currentTheme = useStore((state) => state.theme);
  const theme = getTheme(currentTheme);

  return (
    <ReactFlowProvider>
      <div className={`w-screen h-screen bg-gradient-to-br ${theme.canvas.background}`}>
        <Canvas />
        <Sidebar />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
