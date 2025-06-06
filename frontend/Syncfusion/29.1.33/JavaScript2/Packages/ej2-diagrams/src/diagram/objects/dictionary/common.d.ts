import { PortShapes, DecoratorShapes, SegmentThumbShapes } from '../../enum/enum';
import { DecoratorModel } from '../connector-model';
import { IconShapeModel } from '../icon-model';
/**
 *ShapeDictionary defines the shape of the default nodes and ports \
 *
 * @returns { string }     ShapeDictionary defines the shape of the default nodes and ports.\
 * @param {PortShapes} shape - provide the element value.
 *
 * @private
 */
export declare function getPortShape(shape: PortShapes): string;
/**
 *ShapeDictionary defines the shape of the default nodes and ports \
 *
 * @returns { string }     ShapeDictionary defines the shape of the default nodes and ports.\
 * @param {DecoratorShapes} shape - provide the element value.
 * @param {DecoratorModel} decorator - provide the element value.
 *
 * @private
 */
export declare function getDecoratorShape(shape: DecoratorShapes, decorator: DecoratorModel): string;
export declare function getSegmentThumbShapeHorizontal(shapes: SegmentThumbShapes): string;
export declare function getSegmentThumbShapeVertical(shapes: SegmentThumbShapes): string;
/**
 *sets the path data for different icon shapes \
 *
 * @returns { string }     sets the path data for different icon shapes\
 * @param {IconShapeModel} icon - provide the element value.
 *
 * @private
 */
export declare function getIconShape(icon: IconShapeModel): string;
