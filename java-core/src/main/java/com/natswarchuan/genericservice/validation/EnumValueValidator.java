package com.natswarchuan.genericservice.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;
import java.util.stream.Stream;

/**
 * Lớp Validator implementation cho annotation {@link EnumValue}.
 *
 * <p>
 * Logic kiểm tra: So sánh giá trị chuỗi nhập vào với tên (name) của tất cả các
 * hằng số trong
 * Enum được chỉ định. Nếu trùng khớp (case-sensitive), giá trị được coi là hợp
 * lệ.
 *
 * @author NatswarChuan
 */
public class EnumValueValidator implements ConstraintValidator<EnumValue, CharSequence> {
  /** Danh sách các giá trị Enum hợp lệ dưới dạng String. */
  private List<String> acceptedValues;

  /**
   * Khởi tạo validator, trích xuất danh sách các hằng số từ Enum class.
   *
   * @param annotation Annotation {@link EnumValue} chứa thông tin cấu hình.
   */
  @Override
  public void initialize(EnumValue annotation) {
    acceptedValues = Stream.of(annotation.enumClass().getEnumConstants())
        .map(Enum::name)
        .toList();
  }

  /**
   * Thực hiện kiểm tra giá trị.
   *
   * @param value   Giá trị cần kiểm tra (dưới dạng CharSequence).
   * @param context Context validation.
   * @return {@code true} nếu giá trị hợp lệ, {@code false} nếu không nằm trong
   *         danh sách Enum.
   */
  @Override
  public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
    if (value == null) {
      return true;
    }
    return acceptedValues.contains(value.toString());
  }
}
