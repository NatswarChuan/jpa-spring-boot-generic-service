package com.natswarchuan.genericservice.service.trait;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import java.util.Optional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;

/**
 * Lớp trừu tượng triển khai các thao tác đọc chi tiết (Read Detail).
 *
 * @param <E>  Kiểu thực thể (Entity).
 * @param <ID> Kiểu khóa chính của thực thể.
 * @author NatswarChuan
 */
    @SuppressWarnings("null")
public abstract class AbReadDetailService<E, ID> extends AbReadSummaryService<E, ID>
        implements IReadDetailService<E, ID> {

    /**
     * Khởi tạo với repository truyền vào.
     *
     * @param repository Repository của thực thể.
     * @param <R>        Kiểu repository.
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbReadDetailService(
            @NonNull R repository) {
        super(repository);
    }

    /** {@inheritDoc} */
    @Override
    public E findById(ID id) {
        Optional<E> result = repository.findById(id);
        if (result.isEmpty()) {
            throw new HttpException(HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id);
        }
        return result.get();
    }

    /** {@inheritDoc} */
    @Override
    public E findOne(Specification<E> spec) {
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với tiêu chí cung cấp.");
        }
        return result.get();
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S findById(ID id, Class<S> dtoClass) {
        Optional<E> result = repository.findById(id);
        if (result.isEmpty()) {
            throw new HttpException(HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id);
        }
        return mapToDto(result.get(), dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, String language) {
        Optional<E> result = repository.findById(id);
        if (result.isEmpty()) {
            throw new HttpException(HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id);
        }
        return mapToDto(result.get(), dtoClass, language);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, Specification<E> spec) {
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id + " và tiêu chí cung cấp.");
        }
        return mapToDto(result.get(), dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, Specification<E> spec, String language) {
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id + " và tiêu chí cung cấp.");
        }
        return mapToDto(result.get(), dtoClass, language);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S findOne(Class<S> dtoClass, Specification<E> spec) {
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với tiêu chí cung cấp.");
        }
        return mapToDto(result.get(), dtoClass);
    }

    /** {@inheritDoc} */
    @Override
    public <S extends IDto<E>> S findOne(Class<S> dtoClass, Specification<E> spec, String language) {
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với tiêu chí cung cấp.");
        }
        return mapToDto(result.get(), dtoClass, language);
    }

    /** {@inheritDoc} */
    @Override
    public boolean exists(Specification<E> spec) {
        return specExecutor.exists(spec);
    }
}
