import { ChartTheme } from '../../common/utils/enum';
import { Chart3DThemeStyle } from './chart3d-Interface';
/**
 * Gets the 3D theme color based on the specified chart theme.
 *
 * @param {ChartTheme} theme - The theme to determine the 3D color for.
 * @returns {Chart3DThemeStyle} An object containing 3D theme color styles.
 * @private
 */
export declare function get3DThemeColor(theme: ChartTheme): Chart3DThemeStyle;
/**
 * Gets the color palette for 3D chart series based on the specified theme.
 *
 * @param {ChartTheme} theme - The theme to determine the color palette for.
 * @returns {string[]} An array of color values representing the 3D series color palette.
 * @private
 */
export declare function get3DSeriesColor(theme: ChartTheme): string[];
