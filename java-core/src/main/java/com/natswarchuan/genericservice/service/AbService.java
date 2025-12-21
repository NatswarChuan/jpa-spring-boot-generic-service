package com.natswarchuan.genericservice.service;

import com.natswarchuan.genericservice.dto.IDto;
import com.natswarchuan.genericservice.exception.HttpException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Lớp trừu tượng cơ sở cung cấp các triển khai mặc định cho các thao tác CRUD
 * (Create, Read,
 * Update, Delete) và các phương thức tiện ích chung cho các service.
 *
 * <p>
 * Lớp này triển khai giao diện {@link IService} và sử dụng một
 * {@link JpaRepository} để tương
 * tác với tầng dữ liệu. Các service cụ thể nên kế thừa từ lớp này để tái sử
 * dụng logic chung và chỉ
 * cần triển khai các phương thức trừu tượng hoặc ghi đè các phương thức hiện có
 * nếu cần logic tùy
 * chỉnh.
 *
 * @param <E>  Kiểu dữ liệu của thực thể (entity).
 * @param <ID> Kiểu dữ liệu của khóa chính (ID).
 * @author NatswarChuan
 */
@Service
@Transactional(rollbackFor = Exception.class)
public abstract class AbService<E, ID> implements IService<E, ID> {

    /**
     * Repository JPA được sử dụng để thực hiện các thao tác truy cập dữ liệu. Được
     * inject tự động bởi
     * Spring.
     */
    protected final JpaRepository<E, ID> repository;

    /**
     * Constructor để inject {@link JpaRepository}.
     *
     * @param repository Repository JPA cho thực thể E với khóa chính kiểu ID.
     */
    protected <R extends JpaRepository<E, ID> & JpaSpecificationExecutor<E>> AbService(R repository) {
        this.repository = repository;
    }

    /**
     * {@inheritDoc}
     *
     * @throws HttpException nếu danh sách thực thể trống (HttpStatus.BAD_REQUEST)
     *                       hoặc có lỗi khi tạo
     *                       instance DTO (HttpStatus.INTERNAL_SERVER_ERROR).
     */
    @Override
    public <S extends IDto<E>> List<S> findAll(Class<S> dtoClass) {
        List<E> data = repository.findAll();
        List<S> result = new ArrayList<>();
        for (E e : data) {
            try {
                S s = dtoClass.getDeclaredConstructor().newInstance();
                s.fromEntity(e);
                result.add(s);
            } catch (Exception ex) {
                throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
            }
        }
        return result;
    }

    /**
     * {@inheritDoc}
     *
     * @throws HttpException nếu không tìm thấy thực thể với ID cung cấp
     *                       (HttpStatus.BAD_REQUEST) hoặc
     *                       có lỗi khi tạo instance DTO
     *                       (HttpStatus.INTERNAL_SERVER_ERROR).
     */
    @Override
    public <S extends IDto<E>> S findById(ID id, Class<S> dtoClass) {
        Optional<E> result = repository.findById(id);
        if (result.isEmpty()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Không tìm thấy thực thể với id= " + id);
        }
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(result.get());
            return s;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    /**
     * {@inheritDoc}
     *
     * @throws HttpException nếu danh sách thực thể trống (HttpStatus.BAD_REQUEST).
     */
    @Override
    public List<E> findAll() {
        List<E> result = repository.findAll();
        return result;
    }

    /**
     * {@inheritDoc}
     *
     * @throws HttpException nếu danh sách thực thể trống (HttpStatus.BAD_REQUEST).
     */
    @Override
    public Page<E> findAll(int page, int size) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> result = repository.findAll(paging);
        return result;
    }

    /**
     * {@inheritDoc}
     *
     * @throws HttpException nếu danh sách thực thể trống (HttpStatus.BAD_REQUEST)
     *                       hoặc có lỗi khi
     *                       chuyển đổi entity sang DTO
     *                       (HttpStatus.INTERNAL_SERVER_ERROR).
     */
    @Override
    public <S extends IDto<E>> Page<S> findAll(int page, int size, Class<S> dtoClass) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = repository.findAll(paging);
        return entityPage.map(
                entity -> {
                    try {
                        S dto = dtoClass.getDeclaredConstructor().newInstance();
                        dto.fromEntity(entity);
                        return dto;
                    } catch (Exception ex) {
                        throw new HttpException(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
                    }
                });
    }

    /**
     * {@inheritDoc}
     *
     * @throws HttpException nếu không tìm thấy thực thể với ID cung cấp
     *                       (HttpStatus.BAD_REQUEST).
     */
    @Override
    public E findById(ID id) {
        Optional<E> result = repository.findById(id);
        if (result.isEmpty()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Không tìm thấy thực thể với id= " + id);
        }
        return result.get();
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Chuyển đổi DTO đầu vào thành thực thể và lưu vào cơ sở dữ liệu.
     */
    @Override
    public <S extends IDto<E>> E create(S newEntity) {
        E ent = newEntity.toEntity();
        return repository.save(ent);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Đầu tiên, phương thức này kiểm tra sự tồn tại của thực thể bằng
     * {@link #findById(ID)}. Nếu
     * không tìm thấy, một {@link HttpException} (HttpStatus.BAD_REQUEST) sẽ được
     * ném ra.
     */
    @Override
    public <S extends IDto<E>> E update(S updateEntity, ID id) {
        E ent = updateEntity.updateEntity(this.findById(id));
        return repository.save(ent);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Đầu tiên, phương thức này kiểm tra sự tồn tại của thực thể bằng
     * {@link #findById(ID)}. Nếu
     * không tìm thấy, một {@link HttpException} (HttpStatus.BAD_REQUEST) sẽ được
     * ném ra.
     */
    @Override
    public <S extends IDto<E>> void delete(S deleteEntity, ID id) {
        this.findById(id);
        E ent = deleteEntity.toEntity();
        repository.delete(ent);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Lưu thực thể mới vào hệ thống và trả về thực thể sau khi lưu.
     */
    @Override
    public E create(E newEntity) {
        return repository.save(newEntity);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Đầu tiên, phương thức này kiểm tra sự tồn tại của thực thể bằng
     * {@link #findById(ID)}. Nếu
     * không tìm thấy, một {@link HttpException} (HttpStatus.BAD_REQUEST) sẽ được
     * ném ra.
     */
    @Override
    public E update(E updateEntity, ID id) {
        this.findById(id);
        return repository.save(updateEntity);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Đầu tiên, phương thức này kiểm tra sự tồn tại của thực thể bằng
     * {@link #findById(ID)}. Nếu
     * không tìm thấy, một {@link HttpException} (HttpStatus.BAD_REQUEST) sẽ được
     * ném ra.
     */
    @Override
    public void delete(E deleteEntity, ID id) {
        this.findById(id);
        repository.delete(deleteEntity);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Đầu tiên, phương thức này tìm thực thể bằng {@link #findById(ID)}. Nếu không
     * tìm thấy, một
     * {@link HttpException} (HttpStatus.BAD_REQUEST) sẽ được ném ra.
     */
    @Override
    public void delete(ID id) {
        E deleteEntity = this.findById(id);
        repository.delete(deleteEntity);
    }

    /**
     * Lưu (tạo mới hoặc cập nhật) một thực thể.
     *
     * <p>
     * Phương thức này sử dụng phương thức {@code save} của {@link JpaRepository}
     * được inject. Nếu
     * thực thể có một khóa chính đã tồn tại trong cơ sở dữ liệu, nó sẽ được cập
     * nhật. Nếu thực thể là
     * mới (ví dụ: khóa chính là null hoặc không tồn tại), nó sẽ được tạo.
     *
     * @param entity Thực thể cần được lưu. Không được là {@code null}.
     * @return Thực thể đã được lưu, có thể chứa các thay đổi được thực hiện bởi
     *         persistence provider
     *         (ví dụ: khóa chính được tạo tự động nếu áp dụng).
     * @see JpaRepository#save(Object)
     */
    @Override
    public E save(E entity) {
        return repository.save(entity);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Trả về một danh sách rỗng nếu tập hợp {@code ids} là {@code null} hoặc rỗng.
     * Không ném ngoại
     * lệ nếu một số ID không tìm thấy, chỉ trả về các thực thể tìm được.
     */
    @Override
    public List<E> findAllById(Collection<ID> ids) {
        if (ids == null || ids.isEmpty()) {
            return Collections.emptyList();
        }
        return repository.findAllById(ids);
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này chuyển đổi DTO đầu vào thành thực thể, lưu nó vào cơ sở dữ
     * liệu, sau đó
     * chuyển đổi thực thể đã lưu thành DTO đầu ra.
     */
    @Override
    public <D extends IDto<E>, S extends IDto<E>> D create(S newEntity, Class<D> dtoClass) {
        E ent = newEntity.toEntity();
        E savedEntity = repository.save(ent);
        try {
            D dto = dtoClass.getDeclaredConstructor().newInstance();
            dto.fromEntity(savedEntity);
            return dto;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm thực thể hiện có theo ID, sử dụng DTO yêu cầu để cập nhật
     * các trường của
     * thực thể, lưu lại, và cuối cùng chuyển đổi thực thể đã cập nhật thành DTO
     * phản hồi.
     */
    @Override
    public <RQ extends IDto<E>, RP extends IDto<E>> RP update(
            RQ updateEntity, ID id, Class<RP> rsClass) {
        try {
            E savedEntity = this.findById(id);
            RP dto = rsClass.getDeclaredConstructor().newInstance();
            savedEntity = dto.updateEntity(savedEntity);
            savedEntity = repository.save(savedEntity);
            dto.fromEntity(savedEntity);
            return dto;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này lấy một trang thực thể và ánh xạ từng thực thể sang DTO tương
     * ứng, có áp dụng
     * logic đa ngôn ngữ.
     */
    @Override
    public <S extends IDto<E>> Page<S> findAll(
            int page, int size, Class<S> dtoClass, String language) {
        Pageable paging = PageRequest.of(page, size);
        Page<E> entityPage = repository.findAll(paging);
        return entityPage.map(
                entity -> {
                    try {
                        S dto = dtoClass.getDeclaredConstructor().newInstance();
                        dto.fromEntity(entity, language);
                        return dto;
                    } catch (Exception ex) {
                        throw new HttpException(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "Lỗi khi chuyển đổi entity sang DTO với ngôn ngữ: " + ex.getMessage());
                    }
                });
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này sử dụng {@link JpaSpecificationExecutor} để truy vấn một trang
     * thực thể dựa
     * trên các tiêu chí lọc và sau đó ánh xạ kết quả sang DTO, có hỗ trợ đa ngôn
     * ngữ.
     */
    public <S extends IDto<E>> Page<S> findAll(
            int page, int size, Specification<E> spec, Class<S> dtoClass, String language) {
        Pageable paging = PageRequest.of(page, size);
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        Page<E> entityPage = specExecutor.findAll(spec, paging);

        return entityPage.map(
                entity -> {
                    try {
                        S dto = dtoClass.getDeclaredConstructor().newInstance();
                        dto.fromEntity(entity, language);
                        return dto;
                    } catch (Exception ex) {
                        throw new HttpException(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "Lỗi khi chuyển đổi entity sang DTO với ngôn ngữ: " + ex.getMessage());
                    }
                });
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tương tự như
     * {@link #findAll(int, int, Specification, Class, String)} nhưng
     * không có tham số ngôn ngữ, sử dụng phương thức chuyển đổi DTO mặc định.
     */
    public <S extends IDto<E>> Page<S> findAll(
            int page, int size, Specification<E> spec, Class<S> dtoClass) {
        Pageable paging = PageRequest.of(page, size);
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        Page<E> entityPage = specExecutor.findAll(spec, paging);

        return entityPage.map(
                entity -> {
                    try {
                        S dto = dtoClass.getDeclaredConstructor().newInstance();
                        dto.fromEntity(entity);
                        return dto;
                    } catch (Exception ex) {
                        throw new HttpException(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "Lỗi khi chuyển đổi entity sang DTO với ngôn ngữ: " + ex.getMessage());
                    }
                });
    }

    @Override
    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này sử dụng {@link JpaSpecificationExecutor} để truy vấn một trang
     * thực thể dựa
     * trên các tiêu chí lọc và sau đó ánh xạ kết quả sang DTO, có hỗ trợ đa ngôn
     * ngữ.
     *
     * @param paging       Đối tượng {@link Pageable} chứa thông tin phân trang.
     * @param spec         Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass     Lớp của DTO để chuyển đổi.
     * @param languageCode Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu phù hợp.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình chuyển đổi entity
     *                       sang DTO.
     */
    public <S extends IDto<E>> Page<S> findAll(
            Pageable paging, Specification<E> spec, Class<S> dtoClass, String languageCode) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        Page<E> entityPage = specExecutor.findAll(spec, paging);

        return entityPage.map(
                entity -> {
                    try {
                        S dto = dtoClass.getDeclaredConstructor().newInstance();
                        dto.fromEntity(entity, languageCode);
                        return dto;
                    } catch (Exception ex) {
                        throw new HttpException(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "Lỗi khi chuyển đổi entity sang DTO với ngôn ngữ: " + ex.getMessage());
                    }
                });
    }

    @Override
    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm một thực thể theo ID, sau đó chuyển đổi nó sang DTO, có áp
     * dụng logic đa
     * ngôn ngữ.
     *
     * @param id       Khóa chính của thực thể cần tìm.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu phù hợp.
     * @return DTO tương ứng với thực thể được tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể
     *                       ({@code HttpStatus.BAD_REQUEST}) hoặc có lỗi
     *                       khi chuyển đổi entity sang DTO
     *                       ({@code HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    public <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, String language) {
        Optional<E> result = repository.findById(id);
        if (result.isEmpty()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, "Không tìm thấy thực thể với id= " + id);
        }
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(result.get(), language);
            return s;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    @Override
    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này lấy tất cả các thực thể từ repository, sau đó chuyển đổi từng
     * thực thể sang
     * DTO tương ứng, có áp dụng logic đa ngôn ngữ.
     *
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu phù hợp.
     * @return Danh sách các DTO đã được chuyển đổi.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình chuyển đổi entity
     *                       sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    public <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, String language) {
        List<E> entities = repository.findAll();
        return entities.stream()
                .map(
                        entity -> {
                            try {
                                S dto = dtoClass.getDeclaredConstructor().newInstance();
                                dto.fromEntity(entity, language);
                                return dto;
                            } catch (Exception ex) {
                                throw new HttpException(
                                        HttpStatus.INTERNAL_SERVER_ERROR,
                                        "Lỗi khi chuyển đổi entity sang DTO với ngôn ngữ: " + ex.getMessage());
                            }
                        })
                .collect(Collectors.toList());
    }

    @Override
    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này sử dụng {@link JpaSpecificationExecutor} để truy vấn một trang
     * thực thể dựa
     * trên các tiêu chí lọc và sau đó ánh xạ kết quả sang DTO, không có hỗ trợ đa
     * ngôn ngữ.
     *
     * @param paging   Đối tượng {@link Pageable} chứa thông tin phân trang.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @return Một trang {@link Page} chứa các DTO đã được chuyển đổi.
     * @throws HttpException Nếu có lỗi xảy ra trong quá trình chuyển đổi entity
     *                       sang DTO.
     */
    public <S extends IDto<E>> Page<S> findAll(
            Pageable paging, Specification<E> spec, Class<S> dtoClass) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        Page<E> entityPage = specExecutor.findAll(spec, paging);

        return entityPage.map(
                entity -> {
                    try {
                        S dto = dtoClass.getDeclaredConstructor().newInstance();
                        dto.fromEntity(entity);
                        return dto;
                    } catch (Exception ex) {
                        throw new HttpException(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                "Lỗi khi chuyển đổi entity sang DTO với ngôn ngữ: " + ex.getMessage());
                    }
                });
    }

    @Override
    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này sử dụng {@link JpaSpecificationExecutor} để truy vấn một trang
     * thực thể dựa
     * trên các tiêu chí lọc, trả về các thực thể thô mà không chuyển đổi sang DTO.
     *
     * @param pageable Đối tượng {@link Pageable} chứa thông tin phân trang.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc.
     * @return Một trang {@link Page} chứa các thực thể {@code E} thô.
     * @throws HttpException (Các triển khai có thể ném nếu có lỗi truy cập dữ
     *                       liệu).
     */
    public <S extends IDto<E>> Page<E> findAll(Pageable pageable, Specification<E> spec) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        return specExecutor.findAll(spec, pageable);
    }

    @Override
    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm một thực thể duy nhất dựa trên các tiêu chí lọc được cung
     * cấp, sau đó
     * chuyển đổi nó sang DTO, có áp dụng logic đa ngôn ngữ.
     *
     * @param id       Khóa chính của thực thể (có thể được sử dụng để xây dựng
     *                 {@code spec}).
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc bổ
     *                 sung.
     * @param language Mã ngôn ngữ (ví dụ: "vi", "en") để lấy dữ liệu phù hợp.
     * @return DTO tương ứng với thực thể tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}) hoặc có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    public <S extends IDto<E>> S findById(
            ID id, Class<S> dtoClass, Specification<E> spec, String language) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;

        Optional<E> result = specExecutor.findOne(spec);

        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id + " và tiêu chí cung cấp.");
        }
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(result.get(), language);
            return s;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    @Override
    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm một thực thể duy nhất dựa trên các tiêu chí lọc được cung
     * cấp, sau đó
     * chuyển đổi nó sang DTO, không có hỗ trợ đa ngôn ngữ.
     *
     * @param id       Khóa chính của thực thể (có thể được sử dụng để xây dựng
     *                 {@code spec}).
     * @param dtoClass Lớp của DTO để chuyển đổi.
     * @param spec     Đối tượng {@link Specification} chứa các điều kiện lọc bổ
     *                 sung.
     * @return DTO tương ứng với thực thể tìm thấy.
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}) hoặc có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    public <S extends IDto<E>> S findById(ID id, Class<S> dtoClass, Specification<E> spec) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;

        Optional<E> result = specExecutor.findOne(spec);

        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với id= " + id + " và tiêu chí cung cấp.");
        }
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(result.get());
            return s;
        } catch (Exception ex) {
            throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm một thực thể duy nhất dựa trên các tiêu chí lọc
     * {@link Specification} và
     * chuyển đổi sang DTO.
     *
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}) hoặc có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    @Override
    public <S extends IDto<E>> S findOne(Class<S> dtoClass, Specification<E> spec) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với tiêu chí cung cấp.");
        }
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(result.get());
            return s;
        } catch (Exception ex) {
            throw new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
        }
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm một thực thể duy nhất dựa trên các tiêu chí lọc
     * {@link Specification}.
     *
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}).
     */
    @Override
    public E findOne(Specification<E> spec) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với tiêu chí cung cấp.");
        }
        return result.get();
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm tất cả các thực thể dựa trên các tiêu chí lọc
     * {@link Specification} và
     * chuyển đổi sang danh sách DTO.
     *
     * @throws HttpException Nếu có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    @Override
    public <S extends IDto<E>> List<S> findAll(Class<S> dtoClass, Specification<E> spec) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        List<E> entities = specExecutor.findAll(spec);

        return entities.stream()
                .map(
                        entity -> {
                            try {
                                S dto = dtoClass.getDeclaredConstructor().newInstance();
                                dto.fromEntity(entity);
                                return dto;
                            } catch (Exception ex) {
                                throw new HttpException(
                                        HttpStatus.INTERNAL_SERVER_ERROR,
                                        "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
                            }
                        })
                .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Triển khai này tìm một thực thể duy nhất dựa trên các tiêu chí lọc
     * {@link Specification} và
     * chuyển đổi sang DTO, có hỗ trợ đa ngôn ngữ.
     *
     * @throws HttpException Nếu không tìm thấy thực thể nào khớp với tiêu chí
     *                       ({@code
     *     HttpStatus.NOT_FOUND}) hoặc có lỗi khi chuyển đổi entity sang DTO ({@code
     *     HttpStatus.INTERNAL_SERVER_ERROR}).
     */
    @Override
    public <S extends IDto<E>> S findOne(Class<S> dtoClass, Specification<E> spec, String language) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        Optional<E> result = specExecutor.findOne(spec);
        if (result.isEmpty()) {
            throw new HttpException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy thực thể với tiêu chí cung cấp.");
        }
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(result.get(), language);
            return s;
        } catch (Exception ex) {
            throw new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
        }
    }

    /**
     * {@inheritDoc}
     *
     * <p>
     * Phương thức này sử dụng {@link Specification} để thực hiện truy vấn với các
     * điều kiện động.
     */
    @Override
    public <S extends IDto<E>> S delete(Class<S> dtoClass, E entity) {
        repository.delete(entity);
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(entity);
            return s;
        } catch (Exception ex) {
            throw new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
        }
    }

    @Override
    public <S extends IDto<E>, T extends IDto<E>> S delete(Class<S> dtoClass, T dto) {
        E entity = dto.toEntity();
        repository.delete(entity);
        try {
            S s = dtoClass.getDeclaredConstructor().newInstance();
            s.fromEntity(entity);
            return s;
        } catch (Exception ex) {
            throw new HttpException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Lỗi khi chuyển đổi entity sang DTO: " + ex.getMessage());
        }
    }

    @Override
    public List<E> findAll(Specification<E> spec) {
        @SuppressWarnings("unchecked")
        JpaSpecificationExecutor<E> specExecutor = (JpaSpecificationExecutor<E>) repository;
        return specExecutor.findAll(spec);
    }
}
