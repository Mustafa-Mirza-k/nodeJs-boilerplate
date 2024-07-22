import {
  Attributes,
  CreateOptions,
  FindOptions,
  Model,
  ModelStatic,
  Optional,
  Transaction,
  WhereOptions,
} from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

const repository = {
  get: <M extends Model>(
    model: ModelStatic<M>,
    FindOptions: FindOptions,
    isSingle: Boolean
  ) => {
    return isSingle ? model.findOne(FindOptions) : model.findAll();
  },

  update: <M extends Model>(
    model: ModelStatic<M>,
    query: WhereOptions,
    updateData: Object
  ) => {
    query = query ? query : {};

    return model.update(updateData, {
      where: query,
    });
  },

  create: <M extends Model>(
    model: ModelStatic<M>,
    data: MakeNullishOptional<M["_creationAttributes"]>,
    options?: CreateOptions<Attributes<M>> | undefined
  ) => {
    return model.create(data, options);
  },

  createMany: <M extends Model>(
    model: ModelStatic<M>,
    data: MakeNullishOptional<M["_creationAttributes"]>[]
  ) => {
    return model.bulkCreate(data);
  },

  delete: <M extends Model>(model: ModelStatic<M>, query: WhereOptions) => {
    return model.destroy({
      where: query,
    });
  },
};

export default repository;
