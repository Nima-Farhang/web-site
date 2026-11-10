output "website_bucket_name" {
  value = aws_s3_bucket.website.id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.website.id
}

output "website_url" {
  value = "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "cloudfront_domain_name" {
  description = "CNAME target for the public hostname in external DNS."
  value       = aws_cloudfront_distribution.website.domain_name
}

output "certificate_dns_records" {
  description = "Publish these certificate-validation records at the external DNS provider and retain them for renewal."
  value = var.custom_domain != "" ? [for record in aws_acm_certificate.website[0].domain_validation_options : {
    name  = record.resource_record_name
    type  = record.resource_record_type
    value = record.resource_record_value
  }] : []
}

output "certificate_arn" {
  description = "Requested CloudFront viewer certificate in us-east-1, if configured."
  value       = var.custom_domain != "" ? aws_acm_certificate.website[0].arn : null
}
