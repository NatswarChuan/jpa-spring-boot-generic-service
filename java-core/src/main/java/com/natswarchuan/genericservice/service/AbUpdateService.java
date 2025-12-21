package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

/**
 * Lớp trừu tượng triển khai các thao tác cập nhật (Update) và lưu (Save).
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
public abstract class AbUpdateService<E, ID> extends AbCreateService<E, ID> implements IUpdateService<E, ID> {

    /**
     * Khởi tạo với repository truyền vào.
     *
     * @param repository Repository của thực thể.
     * @param <R>        Kiểu repository.
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbUpdateService(@NonNull R repository) {
        super(repository);
    }

    /** {@inheritDoc} */
    @Override
    public E update(@NonNull E updateEntity, ID id) {
        E oldEntity = this.findById(id);
        beforeUpdate(updateEntity, oldEntity);
        E savedEntity = repository.save(updateEntity);
        afterUpdate(savedEntity, oldEntity);
        return savedEntity;
    }

    /** {@inheritDoc} */
    @Override
    public E update(@NonNull E entity) {
        beforeUpdate(entity, null);
        E savedEntity = repository.save(entity);
        afterUpdate(savedEntity, null);
        return savedEntity;
    }

    /** {@inheritDoc} */
    @Override
    public E save(@NonNull E entity) {
        beforeUpdate(entity, null);
        E savedEntity = repository.save(entity);
        afterUpdate(savedEntity, null);
        return savedEntity;
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>> E update(@NonNull S updateEntity, @NonNull ID id) {
        E oldEntity = this.findById(id);
        E ent = updateEntity.updateEntity(oldEntity);
        beforeUpdate(ent, oldEntity);
        E savedEntity = repository.save(ent);
        afterUpdate(savedEntity, oldEntity);
        return savedEntity;
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S update(@NonNull Class<S> dtoClass, @NonNull E entity) {
        beforeUpdate(entity, null);
        E savedEntity = repository.save(entity);
        afterUpdate(savedEntity, null);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S save(@NonNull Class<S> dtoClass, @NonNull E entity) {
        beforeUpdate(entity, null);
        E savedEntity = repository.save(entity);
        afterUpdate(savedEntity, null);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>, T extends IDto<E>> S update(@NonNull Class<S> dtoClass, @NonNull T dto) {
        E entity = dto.toEntity();
        beforeUpdate(entity, null);
        E savedEntity = repository.save(entity);
        afterUpdate(savedEntity, null);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>, T extends IDto<E>> S save(@NonNull Class<S> dtoClass, @NonNull T dto) {
        E entity = dto.toEntity();
        beforeUpdate(entity, null);
        E savedEntity = repository.save(entity);
        afterUpdate(savedEntity, null);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <RQ extends IDto<E>, RP extends IDto<E>> RP update(
            @NonNull RQ updateEntity, @NonNull ID id, @NonNull Class<RP> rsClass) {
        E oldEntity = this.findById(id);
        E ent = updateEntity.updateEntity(oldEntity);
        beforeUpdate(ent, oldEntity);
        E savedEntity = repository.save(ent);
        afterUpdate(savedEntity, oldEntity);
        return mapToDto(savedEntity, rsClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S update(@NonNull E updateEntity, @NonNull ID id, @NonNull Class<S> dtoClass) {
        E oldEntity = this.findById(id);
        beforeUpdate(updateEntity, oldEntity);
        E saved = repository.save(updateEntity);
        afterUpdate(saved, oldEntity);
        return mapToDto(saved, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public List<E> update(@NonNull E updateEntity, @NonNull Specification<E> spec) {
        List<E> entities = specExecutor.findAll(spec);
        for (E entity : entities) {
            beforeUpdate(entity, null);
        }
        List<E> savedEntities = repository.saveAll(entities);
        for (E savedEntity : savedEntities) {
            afterUpdate(savedEntity, null);
        }
        return savedEntities;
    }

    /**
     * Hook được gọi trước khi cập nhật thực thể.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity    Thực thể chứa thông tin mới.
     * @param oldEntity Thực thể hiện tại trong database (có thể null trong một số
     *                  trường hợp update hàng loạt).
     */
    protected void beforeUpdate(E entity, E oldEntity) {
    }

    /**
     * Hook được gọi sau khi cập nhật thực thể thành công.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity    Thực thể đã được cập nhật và lưu vào DB.
     * @param oldEntity Thực thể trạng thái trước khi cập nhật (có thể null).
     */
    protected void afterUpdate(E entity, E oldEntity) {
    }
}
