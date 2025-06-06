/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { workspaces } from '@angular-devkit/core';
export type WorkspaceDefinition = workspaces.WorkspaceDefinition;
export type ProjectDefinition = workspaces.ProjectDefinition;
/**
 * Gets a style file with the given extension in a project and returns its path. If no
 * extension is specified, any style file with a valid extension will be returned.
 */
export declare function getProjectStyleFile(project: WorkspaceDefinition, extension?: string): string | null;
/** Throws if the project is not using the default Angular devkit builders. */
export declare function assertDefaultBuildersConfigured(project: any): void;
