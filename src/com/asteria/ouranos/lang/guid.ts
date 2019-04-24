/**
 * Generates and returns a unique identifier string.
 * 
 * @returns {string} a unique identifier string.
 */
export function guid(): string {
  /*
  * @author Slavik Meltser (slavik@meltser.info).
  * @link http://slavik.meltser.info/?p=142
  */
  const DASH: string = '-';
  const MASK: string = "000000000";
  function _p8(s: boolean): string {
    const p: string = (Math.random().toString(16) + MASK).substr(2, 8);
    return s ? DASH + p.substr(0, 4) + DASH + p.substr(4, 4) : p ;
  }
  return _p8(false) + _p8(true) + _p8(true) + _p8(false);
}