package com.natswarchuan.genericservice.service.trait;

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
    @SuppressWarnings("null")
    public E update(@NonNull E updateEntity, ID id) {
        this.findById(id);
        E entity = beforeUpdate(updateEntity);
        E savedEntity = repository.save(entity);
        return afterUpdate(savedEntity);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public E update(@NonNull E entity) {
        entity = beforeUpdate(entity);
        E savedEntity = repository.save(entity);
        return afterUpdate(savedEntity);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public E save(@NonNull E entity) {
        entity = beforeUpdate(entity);
        E savedEntity = repository.save(entity);
        return afterUpdate(savedEntity);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>> E update(@NonNull S updateEntity, @NonNull ID id) {
        E oldEntity = this.findById(id);
        E ent = updateEntity.updateEntity(oldEntity);
        ent = beforeUpdate(ent);
        E savedEntity = repository.save(ent);
        return afterUpdate(savedEntity);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>> S update(@NonNull Class<S> dtoClass, @NonNull E entity) {
        entity = beforeUpdate(entity);
        E savedEntity = repository.save(entity);
        savedEntity = afterUpdate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>> S save(@NonNull Class<S> dtoClass, @NonNull E entity) {
        entity = beforeUpdate(entity);
        E savedEntity = repository.save(entity);
        savedEntity = afterUpdate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>, T extends IDto<E>> S update(@NonNull Class<S> dtoClass, @NonNull T dto) {
        E entity = dto.toEntity();
        entity = beforeUpdate(entity);
        E savedEntity = repository.save(entity);
        savedEntity = afterUpdate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>, T extends IDto<E>> S save(@NonNull Class<S> dtoClass, @NonNull T dto) {
        E entity = dto.toEntity();
        entity = beforeUpdate(entity);
        E savedEntity = repository.save(entity);
        savedEntity = afterUpdate(savedEntity);
        return mapToDto(savedEntity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <RQ extends IDto<E>, RP extends IDto<E>> RP update(
            @NonNull RQ updateEntity, @NonNull ID id, @NonNull Class<RP> rsClass) {
        E oldEntity = this.findById(id);
        E ent = updateEntity.updateEntity(oldEntity);
        ent = beforeUpdate(ent);
        E savedEntity = repository.save(ent);
        savedEntity = afterUpdate(savedEntity);
        return mapToDto(savedEntity, rsClass);
    }

    /** {@inheritDoc} */
    @Override
    @SuppressWarnings("null")
    public <S extends IDto<E>> S update(@NonNull E updateEntity, @NonNull ID id, @NonNull Class<S> dtoClass) {
        this.findById(id);
        E entity = beforeUpdate(updateEntity);
        E saved = repository.save(entity);
        saved = afterUpdate(saved);
        return mapToDto(saved, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public List<E> update(@NonNull E updateEntity, @NonNull Specification<E> spec) {
        List<E> entities = specExecutor.findAll(spec);
        for (int i = 0; i < entities.size(); i++) {
            entities.set(i, beforeUpdate(entities.get(i)));
        }
        List<E> savedEntities = repository.saveAll(entities);
        for (int i = 0; i < savedEntities.size(); i++) {
            savedEntities.set(i, afterUpdate(savedEntities.get(i)));
        }
        return savedEntities;
    }

    /**
     * Hook được gọi trước khi cập nhật thực thể.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể chứa thông tin mới.
     * @return Thực thể sau khi xử lý.
     */
    protected E beforeUpdate(E entity) {
        return entity;
    }

    /**
     * Hook được gọi sau khi cập nhật thực thể thành công.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể đã được cập nhật và lưu vào DB.
     * @return Thực thể sau khi xử lý.
     */
    protected E afterUpdate(E entity) {
        return entity;
    }
}
