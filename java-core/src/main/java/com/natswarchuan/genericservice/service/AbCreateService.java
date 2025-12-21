package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

/**
 * Lớp trừu tượng triển khai các thao tác tạo mới (Create).
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
public abstract class AbCreateService<E, ID> extends AbReadDetailService<E, ID> implements ICreateService<E, ID> {

    /**
     * Khởi tạo với repository truyền vào.
     *
     * @param repository Repository của thực thể.
     * @param <R>        Kiểu repository.
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbCreateService(@NonNull R repository) {
        super(repository);
    }

    /** {@inheritDoc} */
    @Override
    public E create(E newEntity) {
        beforeCreate(newEntity);
        E savedEntity = repository.save(newEntity);
        afterCreate(savedEntity);
        return savedEntity;
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> E create(@NonNull S newEntity) {
        E ent = newEntity.toEntity();
        beforeCreate(ent);
        E savedEntity = repository.save(ent);
        afterCreate(savedEntity);
        return savedEntity;
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S create(Class<S> dtoClass, E entity) {
        beforeCreate(entity);
        E savedEntity = repository.save(entity);
        afterCreate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <D extends IDto<E>, S extends IDto<E>> D create(@NonNull S newEntity, @NonNull Class<D> dtoClass) {
        E ent = newEntity.toEntity();
        beforeCreate(ent);
        E savedEntity = repository.save(ent);
        afterCreate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>, T extends IDto<E>> S create(@NonNull Class<S> dtoClass, @NonNull T dto) {
        E entity = dto.toEntity();
        beforeCreate(entity);
        E savedEntity = repository.save(entity);
        afterCreate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /**
     * Hook được gọi trước khi tạo mới thực thể.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể sắp được tạo.
     */
    protected void beforeCreate(E entity) {
    }

    /**
     * Hook được gọi sau khi tạo mới thực thể thành công.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể đã được tạo và lưu vào DB.
     */
    protected void afterCreate(E entity) {
    }
}
