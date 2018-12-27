export default function getNextAnimationSequence(currentSequence, sequences) {
  // get next current sequence id
  let nextSequenceId = sequences.indexOf(currentSequence) + 1;
  // if next sequence doesn't exists,
  // reset sequence
  if (nextSequenceId >= sequences.length) {
    nextSequenceId = 0;
  }
  // return sequence
  return sequences[nextSequenceId];
}
