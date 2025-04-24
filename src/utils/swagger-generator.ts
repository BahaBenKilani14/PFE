import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

/**
 * Decorator factory for common GET endpoints
 * @param summary - Operation summary
 * @param description - Detailed description
 */
export function ApiGetAll(summary = 'Get all records', description = '') {
  return applyDecorators(
    ApiOperation({
      summary,
      description: description || `Retrieves all records`,
    }),
    ApiResponse({
      status: 200,
      description: 'Records retrieved successfully',
    }),
  );
}

/**
 * Decorator factory for GET by ID endpoints
 * @param entityName - Name of the entity
 */
export function ApiGetById(entityName: string) {
  return applyDecorators(
    ApiOperation({
      summary: `Get a ${entityName} by ID`,
    }),
    ApiParam({
      name: 'id',
      description: `The ${entityName} identifier`,
      type: 'number',
    }),
    ApiResponse({
      status: 200,
      description: `${entityName} found`,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found`,
    }),
  );
}

/**
 * Decorator factory for POST create endpoints
 * @param entityName - Name of the entity
 */
export function ApiCreate(entityName: string) {
  return applyDecorators(
    ApiOperation({
      summary: `Create a new ${entityName}`,
    }),
    ApiResponse({
      status: 201,
      description: `${entityName} has been successfully created`,
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input data',
    }),
  );
}

/**
 * Decorator factory for PATCH/PUT update endpoints
 * @param entityName - Name of the entity
 */
export function ApiUpdate(entityName: string) {
  return applyDecorators(
    ApiOperation({
      summary: `Update a ${entityName}`,
    }),
    ApiParam({
      name: 'id',
      description: `The ${entityName} identifier`,
      type: 'number',
    }),
    ApiResponse({
      status: 200,
      description: `${entityName} has been successfully updated`,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found`,
    }),
    ApiResponse({
      status: 400,
      description: 'Invalid input data',
    }),
  );
}

/**
 * Decorator factory for DELETE endpoints
 * @param entityName - Name of the entity
 */
export function ApiDelete(entityName: string) {
  return applyDecorators(
    ApiOperation({
      summary: `Delete a ${entityName}`,
    }),
    ApiParam({
      name: 'id',
      description: `The ${entityName} identifier`,
      type: 'number',
    }),
    ApiResponse({
      status: 200,
      description: `${entityName} has been successfully deleted`,
    }),
    ApiResponse({
      status: 404,
      description: `${entityName} not found`,
    }),
  );
}

/**
 * Decorator factory for authenticated endpoints
 */
export function ApiProtected() {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Missing or invalid authentication',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - User does not have permission',
    }),
  );
}

/**
 * Decorator factory for adding pagination query parameters
 */
export function ApiPagination() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      description: 'Page number (1-based)',
      type: 'number',
      required: false,
    }),
    ApiQuery({
      name: 'limit',
      description: 'Number of items per page',
      type: 'number',
      required: false,
    }),
  );
} 