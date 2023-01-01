/// <reference types="../CTAutocomplete" />
import RenderLib from "../RenderLib"
import Settings from "./config"
import { get_data } from "./utils/utils"
import "./features/displayloot"

register("command", () => Settings.openGUI()).setName("m4utils", true)

let boss = false
let bows = []

register("worldLoad", () => {
  boss = false;
})

register("chat", () => {
  boss = true;
}).setCriteria(/\[BOSS\] Thorn.+/)

register("renderWorld", () => {
  if(!boss) return
  bows.forEach(bow => {
	  if(Settings.spiritBowEsp && bow.getName().includes("Spirit Bow")) {
		  RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 255, 215, 0, 1, false)
	  } else if(Settings.spiritBearEsp && bow.getName().includes("Spirit Bear")) {
		  RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 0, 215, 0, 1, false)
	  }
  })
})

register("step", () => {
  if(!boss || !World.isLoaded() || !Settings.spiritBearEsp && !Settings.spiritBowEsp) return
  new Thread(() => bows = World.getAllEntities().filter(e => e.getName().includes("Spirit"))).start();
}).setFps(2)

register("spawnParticle", (name, type, event) => {
  if(!boss || !Settings.disableAotdParticles) return
  if(type.toString().includes("FLAME")) cancel(event)
})

register("chat", (event) => {
  if(!boss || !Settings.disableAotdIneffectiveMsg) return;
  cancel(event);
}).setCriteria("This creature is immune to this kind of magic!")


register("chat", (name) => {
  if(!Settings.m4CompletionsChecker) return;
  setTimeout( () => get_data(name), 2500)
}).setCriteria(/Party Finder > (.+) joined the dungeon group! \(.+\)/)


register("command", (username) => {
  get_data(username)
}).setName("comps")
