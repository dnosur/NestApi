import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';

@Injectable()
export class DbService {
  constructor() {}

  async getData<T extends Model>(
    model: new () => T,
    options = {
      raw: true,
      attributes: ['*'],
    },
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      options.attributes = options?.attributes ?? ['*'];

      model['findAll'](options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject({
            error: '[GET ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }

  async getDataById<T extends Model>(
    model: new () => T,
    id: number,
    options = {
      raw: true,
      attributes: ['*'],
    },
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      options.attributes = options?.attributes ?? ['*'];

      model['findByPk'](id, options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject({
            error: '[GET ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }

  async getDataBy<T extends Model>(
    model: new () => T,
    where: object,
    options = {
      raw: true,
      attributes: ['*'],
    },
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      options.attributes = options?.attributes ?? ['*'];

      model['findAll']({ where, ...options })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject({
            error: '[GET ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }

  async setData<T extends Model>(
    model: new () => T,
    data: object,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      model['create'](data)
        .then((data) => {
          resolve({
            message: 'Created successfull!',
            data: data,
          });
        })
        .catch((err) => {
          reject({
            error: '[SET ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }

  async updateData<T extends Model>(
    model: new () => T,
    id: number,
    data: object,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      model['update'](data, { where: { id } })
        .then(() => {
          resolve({
            message: 'Updated successfull!',
          });
        })
        .catch((err) => {
          reject({
            error: '[UPDATE ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }

  async updateDataWhere<T extends Model>(
    model: new () => T,
    where: object,
    data: object,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      model['update'](data, { where })
        .then(() => {
          resolve({
            message: 'Updated successfull!',
          });
        })
        .catch((err) => {
          reject({
            error: '[UPDATE ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }

  async deleteData<T extends Model>(
    model: new () => T,
    id: number,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      model['destroy']({ where: { id } })
        .then(() => {
          resolve({
            message: 'Deleted successfull!',
          });
        })
        .catch((err) => {
          reject({
            error: '[DELETE ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }

  async deleteDataWhere<T extends Model>(
    model: new () => T,
    where: object,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      model['destroy']({ where })
        .then(() => {
          resolve({
            message: 'Deleted successfull!',
          });
        })
        .catch((err) => {
          reject({
            error: '[DELETE ERROR]: Data is incorrect!',
            message: err.toString(),
          });
        });
    });
  }
}
