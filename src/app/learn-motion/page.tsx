"use client";
import MotionDiv from "@/components/motion-div";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const item = { divdiv: { x: -120, opacity: 0 } };
const list = { divdiv: { x: [null, 100, 0], y: 20 } };
export default function Home() {
  // use state
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  //useAnimate
  const [scope, animate] = useAnimate();
  // use scroll
  const { scrollY, scrollYProgress } = useScroll();
  const background = useTransform(
    scrollYProgress,
    [0, 1],
    ["#ffffff", "#000000"]
  );

  // use in view
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <main className="w-full h-[100rem] flex flex-col items-center">
      <button onClick={() => setIsVisible((x) => !x)}>
        {isVisible ? "true" : "false"}
      </button>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              key={crypto.randomUUID()}
              className={"bg-orange-200 rounded-full size-44"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>
      <RotatingCube />

      {/* <div className=" anim">Testing</div> */}
      <MotionDiv
        style={{ scaleX: scrollYProgress, background }}
        className={"fixed w-full h-10 bg-blue-500 top-0 origin-left"}
      />

      <MotionDiv
        whileInView={{ opacity: 1 }}
        whileTap={{ scale: 1.2 }}
        animate={"divdiv"} // animate pasangannya variants
        variants={list}
        className="w-20 h-20  bg-red-500 cursor-pointer"
      >
        <motion.li
          variants={item}
          className={"bg-blue-500 size-20"}
        ></motion.li>
      </MotionDiv>
      <MotionDiv
        onViewportEnter={() => console.log("start")}
        onViewportLeave={() => console.log("exit")}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, x: [null, 100] }}
        whileTap={{ scale: 2 }}
        className="w-20 h-20 mt-[200rem] bg-red-500 cursor-pointer"
      />
    </main>
  );
}

const RotatingCube = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      duration: 10,
      repeat: -1,
      rotation: 360,
    });
  }, []);

  return <div ref={boxRef} className="w-20 h-20 bg-green-700" />;
};
