import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tb_user' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  	id!: number
  
  @Column()
  	name!: string
  
  @Column()
  	email!: string
  
  @Column()
  	birth_date!: Date
  
  @Column()
  	cpf!: string

  @Column()
  	rg!: string
  
  @Column()
  	phone!: string
  
  @Column()
  	password!: string

  @CreateDateColumn()
  	created_at!: Date

  @UpdateDateColumn()
  	updated_at!: Date
}