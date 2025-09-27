import BlurText from "./motion";



function MotionUse() {
  return (
    <BlurText
      text="Delicious Fast food For today"
      delay={150}
      animateBy="words"
      direction="top"
    />
  );
}

export default MotionUse;
