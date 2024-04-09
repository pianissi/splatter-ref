"use client";

import { Rnd } from "react-rnd";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function RefImage({src}: { src: string }) {
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
    >
      <Image 
        src={src}
        fill={true}
        alt="user reference image"
        draggable={false}
      />
    </Rnd>
  )
}