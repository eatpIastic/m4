import config from "../config";
import { data, abc } from "../utils/utils";
import "../utils/utils";

let secondmaster = 0
let spiritwing = 0
let spiritbow = 0

let added = false

register("step", () => {
    if(!World.isLoaded() || !config.lootoverlay) return
    
    let container = Player.getContainer() ?? null
    if(container == null || !container) return

    if(container.getName() == "Obsidian Chest"){
        container.getItems().filter(e => e != null).map(e => {

            if(e.getName().removeFormatting() == "Second Master Star" && !added){
                secondmaster += 1
                added = true
            }
            if(e.getName().removeFormatting() == "Spirit Wing" && !added){
                spiritwing += 1
                added = true
            }
            if(e.getName().removeFormatting() == "Spirit Bow" && !added){
                spiritbow += 1
                added = true
            }

        })
    }
}).setFps(3)

register("renderOverlay", () => {
    if(!config.lootoverlay) return

    if (abc.isOpen()) {
        const txt = "Click anywhere to move!"
        Renderer.drawStringWithShadow(txt, Renderer.screen.getWidth()/2 - Renderer.getStringWidth(txt)/2, Renderer.screen.getHeight()/2)
    }
    
    let a1 = `&5Second Master Stars: &6${secondmaster}`
    let a2 = `&5Spirit Wings: &6${spiritwing}`
    let a3 = `&6Spirit Bows: &6${spiritbow}`

    Renderer.drawStringWithShadow(`${a1}\n${a2}\n${a3}`, data.x, data.y)
})

register("worldLoad", () => added = false)