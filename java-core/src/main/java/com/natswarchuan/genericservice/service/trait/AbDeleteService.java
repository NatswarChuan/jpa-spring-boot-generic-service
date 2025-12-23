package com.natswarchuan.genericservice.service.trait;

import com.natswarchuan.genericservice.dto.IDto;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.lang.NonNull;

/**
 * Lớp trừu tượng triển khai các thao tác xóa (Delete).
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
@SuppressWarnings("null")
public abstract class AbDeleteService<E, ID> extends AbUpdateService<E, ID> implements IDeleteService<E, ID> {

    /**
     * Khởi tạo với repository truyền vào.
     *
     * @param repository Repository của thực thể.
     * @param <R>        Kiểu repository.
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbDeleteService(@NonNull R repository) {
        super(repository);
    }

    /** {@inheritDoc} */
    @Override
    public void delete(ID id) {
        E deleteEntity = this.findById(id);
        deleteEntity = beforeDelete(deleteEntity);
        repository.delete(deleteEntity);
        afterDelete(deleteEntity);
    }

    /** {@inheritDoc} */
    @Override
    public void delete(@NonNull E deleteEntity, @NonNull ID id) {
        E entity = this.findById(id);
        entity = beforeDelete(entity);
        repository.delete(entity);
        afterDelete(entity);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> void delete(@NonNull S deleteEntity, @NonNull ID id) {
        E entity = this.findById(id);
        entity = beforeDelete(entity);
        E ent = deleteEntity.toEntity();
        repository.delete(ent);
        afterDelete(entity);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S delete(@NonNull Class<S> dtoClass, @NonNull E entity) {
        entity = beforeDelete(entity);
        repository.delete(entity);
        afterDelete(entity);
        return mapToDto(entity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>, T extends IDto<E>> S delete(@NonNull Class<S> dtoClass, @NonNull T dto) {
        E entity = dto.toEntity();
        entity = beforeDelete(entity);
        repository.delete(entity);
        afterDelete(entity);
        return mapToDto(entity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S delete(@NonNull ID id, @NonNull Class<S> dtoClass) {
        E entity = findById(id);
        entity = beforeDelete(entity);
        repository.delete(entity);
        afterDelete(entity);
        return mapToDto(entity, dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public void delete(@NonNull Specification<E> spec) {
        List<E> entities = specExecutor.findAll(spec);
        for (int i = 0; i < entities.size(); i++) {
            entities.set(i, beforeDelete(entities.get(i)));
        }
        repository.deleteAll(entities);
        for (E entity : entities) {
            afterDelete(entity);
        }
    }

    /**
     * Hook được gọi trước khi xóa thực thể.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể sắp bị xóa.
     * @return Thực thể sau khi xử lý.
     */
    protected E beforeDelete(E entity) {
        return entity;
    }

    /**
     * Hook được gọi sau khi xóa thực thể thành công.
     * <p>
     * Subclass có thể override phương thức này để thực hiện xử lý bổ sung.
     *
     * @param entity Thực thể đã bị xóa khỏi DB.
     * @return Thực thể sau khi xử lý.
     */
    protected E afterDelete(E entity) {
        return entity;
    }
}
