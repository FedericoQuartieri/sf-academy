provider "aws" {
    access_key = var.access_key
    secret_key = var.secret_key
    region = "eu-south-1"
}

resource "aws_security_group" "recensioni_film"{
    name = "recensioni_film"
    description = "recensioni-film"

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port = 5000
        to_port = 5000
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}



resource "aws_instance" "recensioni-film" {
    ami           = "ami-0759301b88845d121"
    instance_type = "t3.micro"
    security_groups = [aws_security_group.recensioni_film.name]
    key_name = "recensioni-film"

    user_data = <<-EOF
            #! /bin/bash
            sudo su
            curl -sL https://rpm.nodesource.com/setup_lts.x | sudo bash -
            sudo yum -y install nodejs
            sudo yum -y install git
            mkdir /home/ec2-user/work 
            cd /home/ec2-user/work
            sudo git clone https://FedericoQuartieri:674127aQ@github.com/FedericoQuartieri/API-recensioni-film
            cd API-recensioni-film
        EOF
}

output "IP" {
    value = aws_instance.recensioni-film.public_ip
}


/*
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
echo "$var.index" >> /var/www/html/index.html

tags = {
    Name = "webserver"
}

output "a" {
    value = module.index
}

resource "local_file" "index" {
    filename = "index.html"
}

data "template_file" "index" {
    template = tostring(file("index.html"))
}

variable "index" {
    type = string
}
*/