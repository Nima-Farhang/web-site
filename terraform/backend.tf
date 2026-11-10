terraform {
  backend "s3" {
    bucket              = "nima-terraform-state-210006516097"
    region              = "ap-southeast-2"
    dynamodb_table      = "terraform-state-lock"
    encrypt             = true
    allowed_account_ids = ["210006516097"]
  }
}
