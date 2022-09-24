import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class address1664043039758 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'tb_address',
			columns: [
				{
					name: 'id',
					type: 'integer',
					generationStrategy: 'rowid',
					isPrimary: true,
					isGenerated: true
				},
				{
					name: 'user_id',
					type: 'integer'
				},
				{
					name: 'uf',
					type: 'char',
					length: '2'
				},
				{
					name: 'city', 
					type: 'varchar',
					length: '128'
				},
				{
					name: 'district',
					type: 'varchar',
					length: '128'
				},
				{
					name: 'zipcode',
					type: 'char',
					length: '9'
				},
				{
					name: 'number',
					type: 'integer'
				},
				{
					name: 'created_at',
					type: 'timestamptz',
					isNullable: false,
					default: 'now()',
				},
				{
					name: 'updated_at',
					type: 'timestamptz',
					isNullable: false,
					default: 'now()',
				},
			]
		}), true)

		await queryRunner.createForeignKey('tb_address', new TableForeignKey({
			name: 'user_address',
			columnNames: ['user_id'],
			referencedColumnNames: ['id'],
			referencedTableName: 'tb_user',
			onDelete: 'SET NULL',
			onUpdate: 'CASCADE',
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('tb_address', 'user_address')
		await queryRunner.dropTable('tb_address')
	}
}
