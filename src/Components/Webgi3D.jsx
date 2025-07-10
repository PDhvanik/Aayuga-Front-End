import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, {
   useCallback,
   useEffect,
   useRef,
   useState
} from 'react';
import {
   AssetManagerPlugin,
   CanvasSnipperPlugin,
   TonemapPlugin,
   ViewerApp,
   addBasePlugins
} from "webgi";
import { scrollAnimation } from '../lib/scroll-animation.js';
import Loading from './Loading.jsx';

gsap.registerPlugin(ScrollTrigger);

function Webgi3D({ onLoaded }) {
   const canvasRef = useRef(null);
   const [loading, setLoading] = useState(true);
   const [showCanvas, setShowCanvas] = useState(false);

   const memoizedScrollAnimation = useCallback(
      (position, target, onUpdate) => {
         if (position && target && onUpdate) {
            scrollAnimation(position, target, onUpdate);
         }
      }, []
   );

   const setupViewer = useCallback(async () => {
      const viewer = new ViewerApp({
         canvas: canvasRef.current,
      })
      const manager = await viewer.addPlugin(AssetManagerPlugin)
      const camera = viewer.scene.activeCamera;
      const position = camera.position;
      const target = camera.target;
      const onUpdate = () => {
         needUpdate = true;
         viewer.setDirty();
      };
      await addBasePlugins(viewer);
      await viewer.addPlugin(CanvasSnipperPlugin)
      viewer.renderer.refreshPipeline()
      await manager.addFromPath("https://aayuga-front-end.vercel.app/scene-2.glb");
      viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
      camera.setCameraOptions({ controlsEnabled: false });
      window.scrollTo(0, 0);
      let needUpdate = true;
      viewer.addEventListener("preFrame", () => {
         if (needUpdate) {
            camera.positionTargetUpdated(true)
            needUpdate = false;
         }
      });
      memoizedScrollAnimation(position, target, onUpdate);
      // Animate loader fade out and canvas fade in
      setLoading(false);
      setTimeout(() => {
         setShowCanvas(true);
         if (onLoaded) onLoaded(); // Notify parent
      }, 100);
   }, [onLoaded]);

   useEffect(() => {
      setupViewer();
   }, []);

   return (
      <div className='fixed flex w-auto h-screen bg-transparent flex-col items-center justify-end z-10 pointer-events-none overflow-x-clip'>
         {/* Canvas with fade-in animation */}
         <canvas
            className='h-[1000px] w-full bg-transparent'
            ref={canvasRef}
            style={{
               opacity: showCanvas ? 1 : 0,
               transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)'
            }}
         />
      </div>
   );
}

export default Webgi3D;