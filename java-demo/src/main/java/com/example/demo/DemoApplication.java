package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Lớp khởi chạy ứng dụng Spring Boot.
 * <p>
 * Đây là điểm bắt đầu của ứng dụng (Entry Point).
 * - Sử dụng @SpringBootApplication để kích hoạt auto-configuration.
 * - Quét các component trong package com.example.demo.
 */
@SpringBootApplication(scanBasePackages = { "com.example.demo", "com.natswarchuan.genericservice" })
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
