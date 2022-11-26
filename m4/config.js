import {
    @Vigilant,
    @SwitchProperty
} from "Vigilance";

@Vigilant("M4", "§dM4 Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    constructor() {
        this.initialize(this);
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
        name: "Disable AOTD Ineffective MSG",
        description: "Removes the message that says 'This creature is immune to this kind of magic!' from AOTD during M4 Boss Fight",
        category: "General",
        subcategory: "General"
    })
    disableAotdIneffectiveMsg = true;
}

export default new Settings();
