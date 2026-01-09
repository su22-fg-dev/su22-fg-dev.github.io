document.addEventListener("DOMContentLoaded",()=>{
    gsap.to("#su22-svg",{y:100,rotation:2,scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
    gsap.utils.toArray("section").forEach(sec=>{gsap.from(sec,{y:80,opacity:0,duration:1,scrollTrigger:{trigger:sec,start:"top 85%"}})});
    const heroImg=document.querySelector("#su22-svg");
    heroImg.addEventListener("mousemove",e=>{
        const rect=heroImg.getBoundingClientRect();
        const x=e.clientX-rect.left; const y=e.clientY-rect.top;
        heroImg.style.transform=`rotateY(${(x-rect.width/2)/25}deg) rotateX(${-(y-rect.height/2)/25}deg) scale(1.05)`;
    });
    heroImg.addEventListener("mouseleave",()=>{heroImg.style.transform="rotate(0deg) scale(1)";});
});
