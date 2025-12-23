package com.natswarchuan.genericservice.service.trait;

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
@SuppressWarnings("null")
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
    public E create(@NonNull E newEntity) {
        E entity = beforeCreate(newEntity);
        E savedEntity = repository.save(entity);
        return afterCreate(savedEntity);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> E create(@NonNull S newEntity) {
        E ent = newEntity.toEntity();
        ent = beforeCreate(ent);
        E savedEntity = repository.save(ent);
        return afterCreate(savedEntity);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S create(Class<S> dtoClass, @NonNull E entity) {
        entity = beforeCreate(entity);
        E savedEntity = repository.save(entity);
        savedEntity = afterCreate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <D extends IDto<E>, S extends IDto<E>> D create(@NonNull S newEntity, @NonNull Class<D> dtoClass) {
        E ent = newEntity.toEntity();
        ent = beforeCreate(ent);
        E savedEntity = repository.save(ent);
        savedEntity = afterCreate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>, T extends IDto<E>> S create(@NonNull Class<S> dtoClass, @NonNull T dto) {
        E entity = dto.toEntity();
        entity = beforeCreate(entity);
        E savedEntity = repository.save(entity);
        savedEntity = afterCreate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /**
     * Hook được gọi trước khi tạo mới thực thể.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể sắp được tạo.
     * @return Thực thể sau khi xử lý.
     */
    protected E beforeCreate(E entity) {
        return entity;
    }

    /**
     * Hook được gọi sau khi tạo mới thực thể thành công.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể đã được tạo và lưu vào DB.
     * @return Thực thể sau khi xử lý.
     */
    protected E afterCreate(E entity) {
        return entity;
    }
}
