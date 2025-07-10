import gsap from "gsap";

export const scrollAnimation = (position, target, onUpdate) => {
  const t1 = gsap.timeline();

  // About section
  t1.to(position, {
    x: 10.5,
    y: 2.0,
    z: -2.0,
    scrollTrigger: {
      trigger: "#about",
      start: "top bottom",
      end: "top top",
      scrub: 2, // more responsive
      immediateRender: false,
    },
    onUpdate,
  })
    .to(target, {
      x: -0.5,
      y: 0.1,
      z: -0.7,
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });

  // Services section
  t1.to(position, {
    x: -3.5, // improved angle for services
    y: 2.5,
    z: 8.0,
    scrollTrigger: {
      trigger: "#services",
      start: "top bottom",
      end: "top top",
      scrub: 2,
      immediateRender: false,
    },
    onUpdate,
  })
    .to(target, {
      x: -1.8,
      y: 0.1,
      z: -0.4,
      scrollTrigger: {
        trigger: "#services",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        immediateRender: false,
      },
    });

  // Contact section
  t1.to(position, {
    x: -16.0, // more natural for contact
    y: 6.0,
    z: 9.0,
    scrollTrigger: {
      trigger: "#contact",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 2,
      immediateRender: false,
    },
    onUpdate,
  })
    .to(target, {
      x: -3.0,
      y: 2.2,
      z: -4.4,
      scrollTrigger: {
        trigger: "#contact",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 2,
        immediateRender: false,
      },
    });
};
