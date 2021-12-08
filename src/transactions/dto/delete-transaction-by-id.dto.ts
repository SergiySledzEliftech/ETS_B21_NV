import { ApiProperty } from "@nestjs/swagger";

export class DeleteTransactionById {
  @ApiProperty()
  readonly id: string;
}