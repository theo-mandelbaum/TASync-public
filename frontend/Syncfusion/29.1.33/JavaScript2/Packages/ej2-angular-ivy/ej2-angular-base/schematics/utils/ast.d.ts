/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { Change } from '@schematics/angular/utility/change';
import { WorkspaceProject } from '@schematics/angular/utility/config';
/**
 * Reads file given path and returns TypeScript source file.
 */
export declare function getSourceFile(host: Tree, path: string): ts.SourceFile;
/**
 * Import and add module to root app module.
 */
export declare function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: WorkspaceProject): void;
/**
 * Import and add module to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to import
 * @param moduleName name of module to import
 * @param src src location to import
 */
export declare function addModuleImportToModule(host: Tree, modulePath: string, moduleName: string, src: string): void;
/**
 * Import and add module to root app component in Angular ^17.
 */
export declare function updateChanges(changes: Change[], modulePath: string, moduleSource: any, moduleName: string, src: string): Change[];
