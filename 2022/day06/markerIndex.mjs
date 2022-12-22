// markerIndex() function
// node v19.2.0

// @param {String} line - A line of text. The elf datastream.
// @param {Number} markerSize - The size of the start-of-packet/message marker.
// @returns {Number, null}
//   The index just after the marker. null if no marker was detected.
export default function markerIndex(line, markerSize) {
  for (let i = markerSize; i < line.length; i++) {
    if ((new Set(line.slice(i-markerSize, i))).size == markerSize)
      return i;
  }

  return null;
}
