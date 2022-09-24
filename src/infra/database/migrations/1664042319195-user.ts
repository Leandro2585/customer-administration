import {MigrationInterface, QueryRunner, Table } from 'typeorm'

export class user1664042319195 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'tb_user',
			columns: [
				{
					name: 'id',
					type: 'integer',
					generationStrategy: 'rowid',
					isPrimary: true,
					isGenerated: true
				},
				{
					name: 'name',
					type: 'varchar',
					length: '64'
				},
				{
					name: 'email',
					type: 'varchar',
					length: '64'
				},
				{
					name: 'birth_date',
					type: 'timestamptz',
					isNullable: false
				},
				{
					name: 'cpf',
					type: 'char',
					length: '15'
				},
				{
					name: 'rg',
					type: 'char',
					length: '12'
				},
				{
					name: 'phone',
					type: 'varchar',
					length: '15'
				},
				{
					name: 'password',
					type: 'varchar',
					length: '512'
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
				}
			]
		}), true)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tb_user')
	}
}
