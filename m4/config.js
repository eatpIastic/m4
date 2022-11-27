import {
    @Vigilant,
    @SwitchProperty,
    @ButtonProperty
} from "Vigilance";

@Vigilant("M4", "§5M4 §fSettings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    constructor() {
        this.initialize(this);
        this.addDependency("M4 Completions Say", "M4 Completions Checker")
    }
    @SwitchProperty({
        name: "Spirit Bear ESP",
        description: "Draws a box around the spirit bears",
        category: "General",
        subcategory: "General"
    })
    spiritBearEsp = true;
    @SwitchProperty({
        name: "Spirit Bow ESP",
        description: "Draws a box around the spirit bows",
        category: "General",
        subcategory: "General"
    })
    spiritBowEsp = true;
    @SwitchProperty({
        name: "Disable AOTD Particles",
        description: "Removes the particles from AOTD during M4 Boss Fight",
        category: "General",
        subcategory: "General"
    })
    disableAotdParticles = true;
    @SwitchProperty({
        name: "M4 Completions Checker",
        description: "Checks how many M4s a player has completed when they join your party finder party",
        category: "General",
        subcategory: "General"
    })
    m4CompletionsChecker = true;

    @SwitchProperty({
        name: "M4 Completions Say",
        description: "Says how many M4s the player has completed in Party Chat",
        category: "General",
        subcategory: "General"
    })
    m4say = false;

    @SwitchProperty({
        name: "Loot Overlay",
        description: "Displays your loot session",
        category: "General",
        subcategory: "General"
    })
    lootoverlay = false;

    @SwitchProperty({
        name: "Disable AOTD Ineffective MSG",
        description: "Removes the message that says 'This creature is immune to this kind of magic!' from AOTD during M4 Boss Fight",
        category: "General",
        subcategory: "General"
    })
    disableAotdIneffectiveMsg = true;

    @ButtonProperty({
        name: "Display Location",
        description: "Changes The Display Location",
        category: "General",
        subcategory: "General",
        placeholder: "Change"
    })
    action() {
        ChatLib.command("m4utilsdisplay", true);
    }
}

export default new Settings();