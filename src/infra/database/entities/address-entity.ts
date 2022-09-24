import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tb_address' })
export class AddressEntity {
  @PrimaryGeneratedColumn('increment')
  	id!: number
  
  @Column()
  	user_id!: number

  @Column()
  	uf!: string

  @Column()
  	city!: string
  
  @Column()
  	district!: string

  @Column()
  	zipcode!: string
  
  @Column()
  	number!: number

  @CreateDateColumn()
  	created_at!: Date

  @UpdateDateColumn()
  	updated_at!: Date
}