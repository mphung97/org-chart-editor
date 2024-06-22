// clone https://github.com/xyflow/xyflow/blob/main/packages/react/src/additional-components/Controls/Controls.tsx
import { memo } from "react";
import cc from "classcat";
import { shallow } from "zustand/shallow";

import {
  useStore,
  useStoreApi,
  useReactFlow,
  Panel,
  ReactFlowState,
  ControlProps,
  ControlButton,
} from "reactflow";
import {
  FitViewIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  UnlockIcon,
} from "@/react-icons";

type RFControlProps = ControlProps & {
  orientation?: "horizontal" | "vertical";
};

const selector = (s: ReactFlowState) => ({
  isInteractive: s.nodesDraggable || s.nodesConnectable || s.elementsSelectable,
  minZoomReached: s.transform[2] <= s.minZoom,
  maxZoomReached: s.transform[2] >= s.maxZoom,
});

function ControlsComponent({
  style,
  showZoom = true,
  showFitView = true,
  showInteractive = true,
  fitViewOptions,
  onZoomIn,
  onZoomOut,
  onFitView,
  onInteractiveChange,
  className,
  children,
  position = "bottom-left",
  orientation = "horizontal",
  "aria-label": ariaLabel = "React Flow controls",
}: RFControlProps) {
  const store = useStoreApi();
  const { isInteractive, minZoomReached, maxZoomReached } = useStore(
    selector,
    shallow,
  );
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const onZoomInHandler = () => {
    zoomIn();
    onZoomIn?.();
  };

  const onZoomOutHandler = () => {
    zoomOut();
    onZoomOut?.();
  };

  const onFitViewHandler = () => {
    fitView(fitViewOptions);
    onFitView?.();
  };

  const onToggleInteractivity = () => {
    store.setState({
      nodesDraggable: !isInteractive,
      nodesConnectable: !isInteractive,
      elementsSelectable: !isInteractive,
    });

    onInteractiveChange?.(!isInteractive);
  };

  const orientationClass =
    orientation === "horizontal" ? "flex" : "";

  return (
    <Panel
      className={cc(["react-flow__controls", orientationClass, className])}
      position={position}
      style={style}
      data-testid="rf__controls"
      aria-label={ariaLabel}
    >
      {showZoom && (
        <>
          <ControlButton
            onClick={onZoomInHandler}
            className="react-flow__controls-zoomin"
            title="zoom in"
            aria-label="zoom in"
            disabled={maxZoomReached}
          >
            <PlusIcon />
          </ControlButton>
          <ControlButton
            onClick={onZoomOutHandler}
            className="react-flow__controls-zoomout"
            title="zoom out"
            aria-label="zoom out"
            disabled={minZoomReached}
          >
            <MinusIcon />
          </ControlButton>
        </>
      )}
      {showFitView && (
        <ControlButton
          className="react-flow__controls-fitview"
          onClick={onFitViewHandler}
          title="fit view"
          aria-label="fit view"
        >
          <FitViewIcon />
        </ControlButton>
      )}
      {showInteractive && (
        <ControlButton
          className="react-flow__controls-interactive"
          onClick={onToggleInteractivity}
          title="toggle interactivity"
          aria-label="toggle interactivity"
        >
          {isInteractive ? <UnlockIcon /> : <LockIcon />}
        </ControlButton>
      )}
      {children}
    </Panel>
  );
}

ControlsComponent.displayName = "Controls";

export const RFControls = memo(ControlsComponent);
