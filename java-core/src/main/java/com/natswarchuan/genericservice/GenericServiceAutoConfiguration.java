package com.natswarchuan.genericservice;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Cấu hình tự động cho Generic Service Library.
 * <p>
 * Class này sẽ tự động quét (scan) các component nằm trong gói
 * {@code com.natswarchuan.genericservice} để đăng ký bean vào Spring Context.
 *
 * @author NatswarChuan
 */
@Configuration
@ComponentScan("com.natswarchuan.genericservice")
public class GenericServiceAutoConfiguration {

}
