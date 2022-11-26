/// <reference types="../CTAutocomplete" />
import RenderLib from "../RenderLib"
import request from '../requestV2';

register("command", (...args) => {
  data.key = args[0];
  data.save();
}).setName("m4apikey")

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
	if(bow.getName().includes("Spirit Bow")) {
		RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 255, 215, 0, 1, false)
	} else if(bow.getName().includes("Spirit Bear")) {
		RenderLib.drawBaritoneEspBox(bow.getRenderX(), bow.getRenderY(), bow.getRenderZ(), .75, 5, 0, 215, 0, 1, false)
	}
  })
})

register("step", () => {
  if(!boss) return;
  new Thread(() => bows = World.getAllEntities().filter(e => e.getName().includes("Spirit"))).start();
}).setFps(2)

register("spawnParticle", (name, type, event) => {
  if(!boss) return;
  if(type.toString().includes("FLAME")) cancel(event)
})

register("chat", (event) => {
  if(!boss) return;
  cancel(event);
}).setCriteria("This creature is immune to this kind of magic!")


register("chat", (name) => {
  let uuid = null;
  new Thread( () => {
  request(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(function(res) {
    uuid = JSON.parse(res)["id"];
  })

  let time = Date.now();
  while(uuid == null) {
    if(Date.now() - time > 1000) {
      ChatLib.chat("&cFailed to get UUID");
      return;
    }
  }
  
    Thread.sleep(1000)
    request(`https://api.slothpixel.me/api/skyblock/profile/${uuid}/`).then( function(res) {
      let m4 = JSON.parse(res)["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["4"];
      Thread.sleep(1500)
      ChatLib.chat(`&b${name}&r has completed &b${m4}&r M4s`)
    });
  }).start();
  
  // https://api.slothpixel.me/api/skyblock/profile/{playerName}/{profileId}
  
}).setCriteria(/Dungeon Finder > (.+) joined the dungeon group! \(.+\)/)


register("command", (...args) => {
  if(args==null || args==undefined || args.length==0) {
    ChatLib.chat("&cPlease specify a player");
    return;
  }
  let name = args[0];
  let uuid = null;
  new Thread( () => {
  request(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(function(res) {
    uuid = JSON.parse(res)["id"];
  })
  let time = Date.now();
  while(uuid == null) {
    if(Date.now() - time > 1000) {
      ChatLib.chat("&cFailed to get UUID");
      return;
    }
  }
    Thread.sleep(1000)
    request(`https://api.slothpixel.me/api/skyblock/profile/${uuid}/`).then( function(res) {
      let m4 = JSON.parse(res)["members"][uuid]["dungeons"]["dungeon_types"]["master_catacombs"]["tier_completions"]["4"];
      ChatLib.command(`pc ${name} has completed ${m4} M4s`)
    });
  }).start();

}).setName("comps")