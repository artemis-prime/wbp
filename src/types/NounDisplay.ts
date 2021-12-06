    // It's up to any display code to capitalize these if desired
interface NounDisplay {
    singular?:  string        // "goose" as in "one goose" (defaults to <noun>)
    plural?:    string        // "geese" as in "two geese" (defaults to <noun> + 's')
    all?:       string        // "geese" as in "all geese" (defaults to "<plural>")
    zero?:      string        // "geese" as in "no geese"  (defaults to "<plural>")
}

export default NounDisplay