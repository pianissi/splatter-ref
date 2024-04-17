"use client";

import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { useOnClickOutside } from "usehooks-ts";

export default function RefImage({id, src, onDragStart, onDragStop, scale, onDelete}: { id:number, src: string, onDragStart: any, onDragStop: any, scale: number, onDelete: any}) {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(50);
  const [isRatioLocked, setIsRatioLocked] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);

    window.addEventListener('keyup', handleKey);
  }, []);

  useOnClickOutside(imageRef, handleUnSelection);

  function handleKey(event : any) {
    setIsRatioLocked(event.shiftKey);
    if (event.key === "Delete") {
      handleDelete(event);
    }
  }

  // TODO make only selected image deleted
  function handleDelete(event: any) {
    
    onDelete(id);
  }

  function handleOnLoad(event : any) {
    if (imageRef.current === null) {
      return;
    }
    setHeight(imageRef.current.naturalHeight);
    setWidth(imageRef.current.naturalWidth);
  }

  function handleOnDragStart(event : any) {
    onDragStart(event);
    setIsSelected(true);
  }

  function handleOnDragStop(event : any) {
    onDragStop(event);
    setIsSelected(true);
  }

  function handleSelection(event : any) {
    setIsSelected(true);
  }

  function handleUnSelection(event : any) {
    setIsSelected(false);
  }

  function handleOnResizeStop(event: any, dir: any, ref: HTMLElement, delta: ResizableDelta, position: Position) {
    setWidth(parseInt(ref.style.width));
    setHeight(parseInt(ref.style.height));
  }

  // TODO: fix selection on click
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: width,
        height: height,
      }}
      size={{width: width, height: height}}
      lockAspectRatio={isRatioLocked}
      onResizeStop={handleOnResizeStop}
      onResize={handleSelection}
      onDragStart={handleOnDragStart}
      onDrag={handleSelection}
      onDragStop={handleOnDragStop}
      onMouseDown={handleSelection}
      scale={scale}
      className={classNames("border-4",
        {
          "border-black": !isSelected,
          "border-sky-600": isSelected
        }
      )}
    >
      <Image 
        src={src}
        ref={imageRef}
        fill={true}
        alt="user reference image"
        draggable={false}
        onLoad={handleOnLoad}
      />
    </Rnd>
  )
}