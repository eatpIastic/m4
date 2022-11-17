/// <reference types="../CTAutocomplete" />
import RenderLib from "../RenderLib"

let boss = false;
let bows = [];

register("worldLoad", () => {
  boss = false;
})

register("chat", () => {
  boss = true;
}).setCriteria(/\[BOSS\] Thorn.+/)

register("renderWorld", () => {
  if(!boss) return;
  bows.forEach(bow => {
    RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 255, 215, 0, 1, false)
  })
})

register("step", () => {
  if(!boss) return;
  new Thread(() => bows = World.getAllEntities().filter(e => e.getName().includes("Spirit Bow"))).start();
}).setFps(2)

register("spawnParticle", (name, type, event) => {
  if(!boss) return;
  if(type.toString().includes("FLAME")) cancel(event)
})

register("chat", (event) => {
  if(!boss) return;
  cancel(event);
}).setCriteria("This creature is immune to this kind of magic!")
