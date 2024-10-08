import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';
import { SubscriptionTypeAttributes, SubscriptionTypeEnum } from '../../types/subscription.types';

interface SubscriptionTypeCreationAttributes extends Optional<SubscriptionTypeAttributes, 'id'> { }

export class SubscriptionType extends Model<SubscriptionTypeAttributes, SubscriptionTypeCreationAttributes>
  implements SubscriptionTypeAttributes {
  public id!: string;
  public type!: SubscriptionTypeEnum;
  public max_events!: number;
  public price!: number;
}

SubscriptionType.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(SubscriptionTypeEnum)),
      allowNull: false,
    },
    max_events: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'SubscriptionType',
    tableName: 'subscription_types',
    timestamps: false,
  }
);