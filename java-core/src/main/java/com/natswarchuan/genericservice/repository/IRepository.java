package com.natswarchuan.genericservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * Interface Repository cơ sở kết hợp JpaRepository và JpaSpecificationExecutor.
 *
 * <p>Các repository trong ứng dụng nên kế thừa interface này thay vì kế thừa riêng lẻ.
 *
 * @param <E> Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
@NoRepositoryBean
public interface IRepository<E, ID> extends JpaRepository<E, ID>, JpaSpecificationExecutor<E> {}
