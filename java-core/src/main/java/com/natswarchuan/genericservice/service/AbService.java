package com.natswarchuan.genericservice.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

/**
 * Lớp trừu tượng cơ sở cung cấp đầy đủ các thao tác CRUD và Specification.
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
public abstract class AbService<E, ID> extends AbDeleteService<E, ID> implements IService<E, ID> {

    /**
     * Khởi tạo service với repository tương ứng.
     *
     * @param repository Repository JPA hỗ trợ cả CRUD và Specification.
     * @param <R>        Kiểu Repository kế thừa JpaRepository và
     *                   JpaSpecificationExecutor.
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbService(@NonNull R repository) {
        super(repository);
    }
}
